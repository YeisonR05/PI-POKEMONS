export function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name='Name is Required';
    }else if(!/^[A-Z]+$/i.test(input.name)){
        errors.name='In the name put only letters';
    };
    if(!input.hp){
        errors.hp='HP is Required';
    }else if(input.hp > 1000){
        errors.hp='Hp cannot exceed 1000';
    };
    if(!input.attack){
        errors.attack='Attack is Required';
    };
    if(!input.defense){
        errors.defense='Defense is Required';
    };
    if(!input.height){
        errors.height='Height is Required';
    };
    if(!input.weight){
        errors.weight='Weight is Required';
    };
    if(!input.image){
        errors.image='Image is Required';
    };

    if(!/\.(jpg|png|jpeg)$/i.test(input.image)
    ){errors.image='tipo de imagen no valida'}
   
    return errors
}