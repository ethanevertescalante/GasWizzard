type ButtonProps = {
    buttonType?: "button" | "submit" | "reset";
    buttonColor?: string;
    buttonSize?: "sm" | "md" | "lg"
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
}


export default function Button ({
    buttonType = "button",
    children,
    onClick,
    disabled = false,
    className = "cursor-pointer hover:underline",
   }: ButtonProps) {
    return (
        <button
            type={buttonType}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {children}
        </button>
    )
}