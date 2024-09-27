export default function Button({
    color = "text-white",
    fontSize = "text-sm",
    bgColor = "bg-custom-orange",
    radius = "rounded-lg",
    text = "button",
    w = "w-auto",
    h = "h-7",
    px = "px-3",
    py = "py-1",
    classes = "",
}) {
    return (
        <div>
            <button
                className={`${color} ${fontSize} ${bgColor} ${radius} ${w} ${h} ${px} ${py} ${classes}`}
            >
                {text}
            </button>
        </div>
    );
}
