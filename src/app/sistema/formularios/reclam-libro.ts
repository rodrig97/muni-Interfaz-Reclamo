import { FormGroup, Validators, FormControl } from "@angular/forms";

export const FormReclamLibro: any = new FormGroup({

    id: new FormControl(''),
    tipo_doc: new FormControl('', Validators.required),
    ape_nom: new FormControl('', Validators.required),
    nombres: new FormControl('', Validators.required),
    apPaterno: new FormControl('', Validators.required),
    apMaterno: new FormControl('', Validators.required),
    ndoc: new FormControl('', Validators.required),
    nroVerifDNI: new FormControl(''),
    phone:  new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    descripcion: new FormControl('', Validators.required),
    detalle: new FormControl(''),
    url: new FormControl(''),
    motivo: new FormControl(''),
    expe_id: new FormControl(''),
    created_at: new FormControl(''),
    updated_at:new FormControl('')
});