export default function Button({
    color = "text-white",
    fontSize = "text-sm",
    bgColor = "bg-custom-orange",
    radius = "rounded-lg",
    text = "button",
    w = "w-[75px]",
    h = "h-7",
    px = "px-3",
    py = "py-1",
    classes = "",
    onClick,
}) {
    return (
        <div>
            <button
                className={`${color} ${fontSize} ${bgColor} ${radius} ${w} ${h} ${px} ${py} ${classes}`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
