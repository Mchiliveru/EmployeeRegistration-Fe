import { Button_Classes, Button_Variants } from "./button.constants";

const Button = ({ variant, children, click, additionalClass, isDisabled}) => {
  const getButtonVariant = (variant) => {
    const buttonVariants = new Map([
      [Button_Variants.DEFAULT, Button_Classes.CLASS_DEFAULT],
      [Button_Variants.SUBMIT, Button_Classes.CLASS_SUBMIT],
      [Button_Variants.CANCEL, Button_Classes.CLASS_CANCEL],
    ]);
    return buttonVariants.get(variant);
  };
  return (
    <button 
      disabled = {isDisabled}
      className={`${getButtonVariant(variant)} ${additionalClass}`} 
      onClick={click}>
      {children}
    </button>
  );
};

// eslint-disable-next-line react/no-typos
Button.defaultprops = {
  variant: Button_Variants.DEFAULT,
};

export default Button;
