import { body, validationResult } from "express-validator";

const validation = async (req, res, next) =>{
    
    // 1. Setup rule for Validation

    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({gt:0}).withMessage('Price should > 0'),
        body('imageUrl').isURL().withMessage('Invalid URL')
    ]
    // 2. run those rule
        await Promise.all(rules.map((rule) => rule.run(req)));
    // 3. check if there are any error after running the rule
        var validationErrors = validationResult(req);

    // 4. if error, return the error message

    if (!validationErrors.isEmpty()) {
        return res.render('new-product', {
          errorMessage: validationErrors.array()[0].msg,
        });
      }
      next();
};

export default validation;