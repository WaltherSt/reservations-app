import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/User';
import {
  addUser,
  clearUserState,
  setLoading,
  updateUser,
} from '../../store/actions/users.actions';
import { UserState } from '../../store/reducers/users.reducer';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  userForm!: FormGroup;
  userUpdate: User = new User();
  updateMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ users: UserState }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.store
      .select('users')
      .subscribe(({ success, loading, userSelected, updateMode }) => {
        this.userUpdate = userSelected;
        const wasUpdating = this.updateMode; // Guarda el estado anterior

        // Determina si estás en modo de actualización
        this.updateMode = updateMode;

        if (this.updateMode) {
          // Rellenar el formulario si es modo de actualización
          if (this.updateMode && this.userForm.pristine) {
            this.userForm.patchValue(this.userUpdate);
          }
        } else {
          // Si cambiamos a modo de registro, reiniciar el formulario
          if (wasUpdating) {
            this.userForm.reset();
          }
        }

        // Manejo de la carga y redirección
        if (this.loading && !loading && success) {
          this.router.navigate(['/users']);
          this.store.dispatch(clearUserState());
        }
        this.loading = loading; // Actualizar el estado de loading
      });
  }

  getControlError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) return 'Este campo es obligatorio';
      if (control.errors?.['minlength'])
        return `Debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres.`;
      if (control.errors?.['maxlength'])
        return `No debe exceder los ${control.errors?.['maxlength'].requiredLength} caracteres.`;
      if (control.errors?.['email']) return 'Email no válido.';
    }
    return null;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.store.dispatch(setLoading({ loading: true }));

      if (this.updateMode) {
        // console.log(this.userForm.value);
        // console.log(this.userUpdate.id);
        console.log(this.userForm.value);

        // Lógica para actualizar un usuario existente
        this.store.dispatch(
          updateUser({ user: this.userForm.value, id: this.userUpdate.id })
        );
      } else {
        // Lógica para registrar un nuevo usuario
        this.store.dispatch(addUser({ user: this.userForm.value }));
      }
    }
  }
}
