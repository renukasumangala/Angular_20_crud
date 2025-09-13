import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Associate } from '../../_shared/associate';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { associateModel } from '../../../model/associate';

@Component({
  selector: 'app-add',
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add implements OnInit, OnDestroy {

  _form!: FormGroup;
  dialogdata: any;
  title = 'Add Associate';
  isadd = true;
  editata!: associateModel;

  constructor(private service: Associate, private builder: FormBuilder,
    private ref: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: any

  ) {

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    if (this.data && this.dialogdata.id > 0) {
      this.title = 'Edit Associate';
      this.isadd = false;
      this.service.Get(this.dialogdata.id).subscribe(item => {
        this.editata = item;
        this._form.setValue({
          id: this.editata.id,
          name: this.editata.name,
          address: this.editata.address,
          cl: this.editata.creditlimit,
          status: this.editata.status
        })
      })
    }
    this._form = this.builder.group({
      id: 0,
      name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      address: this.builder.control('', Validators.required),
      cl: this.builder.control(0, Validators.required),
      status: this.builder.control(true),
    })
  }
  ngOnDestroy(): void {

  }

  close() {
    this.ref.close();
  }
  save() {
    if (this._form.valid) {
      let _data: associateModel = {
        id: this._form.value.id as number,
        name: this._form.value.name as string,
        address: this._form.value.address as string,
        creditlimit: this._form.value.cl as number,
        status: this._form.value.status as boolean,
      }
      if (this.isadd) {
        this.service.Create(_data).subscribe(item => {
          alert('Saved.')
          this.close();

        })
      } else {
        this.service.Update(_data).subscribe(item => {
          alert('Updated.')
          this.close();

        })
      }
    }
  }

}
