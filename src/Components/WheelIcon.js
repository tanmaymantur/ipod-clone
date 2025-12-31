
const WheelIcon = ({ src, alt, iconHeight }) => {
    return (
        <img src={src} alt={alt} style={{ height: iconHeight || 20, filter: 'invert(100%) brightness(50%)' }} draggable="false" />
    )
}

export default WheelIcon