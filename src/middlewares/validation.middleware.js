
const validation = (req, res, next) =>{
    const {name, price, imageUrl} = req.body;
    let errors = [];

    if(!name || name.trim() ==''){
        errors.push("Name is required");
    }

    if(!price || parseFloat(price) < 1){
        errors.push("Price is required");
    }

    try {
        const validURL = new URL(imageUrl);
    } catch (error) {
        errors.push("URL is invalid");
    }

    if (errors.length > 0) {
        return res.render('new-product', {
          errorMessage: errors[0],
        });
      }

}

export default validation;