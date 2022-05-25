import { FormGroup, Validators, FormControl } from "@angular/forms";

export const formDependencia: any = new FormGroup({

    oper_id : new FormControl(''),
    expe_id : new FormControl(''),
    depe_id : new FormControl(''),
    id_usu  : new FormControl(''),
    archi_id: new FormControl(''),
    oper_fecha  : new FormControl(''),
    oper_hora   : new FormControl(''),
    oper_idtope : new FormControl(''),
    oper_forma  : new FormControl(''),
    oper_depeid_d   : new FormControl(''),
    oper_usuaid_d   : new FormControl(''),
    oper_detalle_destino    : new FormControl(''),
    oper_acciones   : new FormControl(''),
    oper_idprocesado    : new FormControl(''),
    oper_expeid_adj : new FormControl(''),
    oper_procesado  : new FormControl(''),

    destinos : new FormControl(''),
    
    /////DUDA
    relacionado : new FormControl(''),
    codigo: new FormControl(''),
});
    
    