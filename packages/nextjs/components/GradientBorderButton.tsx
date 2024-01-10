type GradientBorderButtonProps = {
  btnText: string;
  className?: string;
  onButtonClick?: () => void;
};

export const GradientBorderButton = ({ btnText, onButtonClick }: GradientBorderButtonProps) => {
  return (
    <div
      className="relative flex items-center justify-center h-10 overflow-hidden font-semibold rounded-full"
      onClick={onButtonClick}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-gradFrom to-gradTo"></div>
      <div className="box-border z-10 flex items-center justify-center h-full px-8 border-2 border-transparent rounded-full bg-clip-padding bg-light">
        {btnText}
      </div>
    </div>
  );
};
