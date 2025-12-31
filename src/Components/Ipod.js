import { Component, createRef } from "react";
import styles from "./Ipod.module.css"
import MenuListItem from "./MenuListItem";
import WheelIcon from "./WheelIcon";

const menuItemsTitles = [
    "Cover Flow",
    "Music",
    "Game",
    "Settings"
]

export default class Ipod extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0
        }
        this.wheelRef = createRef();
        this.lastAngle = null;
        this.sensitivity = 15;
    }

    getAngle = (clientX, clientY) => {
        const rect = this.wheelRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = clientX - centerX;
        const y = clientY - centerY;
        let degrees = Math.atan2(y, x) * (180 / Math.PI);
        if (degrees < 0) degrees += 360;
        return degrees;
    }

    handleMouseUp = () => {
        this.lastAngle = null;
    }

    handleMouseMove = (e) => {
        if (e.buttons !== 1) return;
        const currentAngle = this.getAngle(e.clientX, e.clientY);
        if (this.lastAngle !== null) {
            let delta = currentAngle - this.lastAngle;

            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;

            if (Math.abs(delta) >= this.sensitivity) {
                const direction = delta > 0 ? 1 : -1;
                this.updateIndex(direction);
                this.lastAngle = currentAngle;
            }
        }
        else {
            this.lastAngle = currentAngle;
        }
    }

    updateIndex = (direction) => {
        const { activeIndex } = this.state;
        let newIndex;

        if (direction === 1) {
            newIndex = (activeIndex + 1) % menuItemsTitles.length;
        }
        else {
            newIndex = (activeIndex - 1 + menuItemsTitles.length) % menuItemsTitles.length
        }
        this.setState({
            activeIndex: newIndex
        })
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.screen}>
                    <div className={styles.list}>
                        <h4>iPod.js</h4>
                        <div>
                            {/* <div className={styles.menuItems}>
                                <span>Cover Flow</span>
                                <img style={{ height: '10px' }} src="https://cdn-icons-png.flaticon.com/128/2985/2985179.png" alt="right arrow" />
                            </div>
                            <div className={styles.menuItems}>Music</div>
                            <div className={styles.menuItems}>Games</div>
                            <div className={styles.menuItems}>Settings</div> */}
                            {menuItemsTitles.map((title, i) => <MenuListItem active={i === activeIndex} title={title} />)}
                        </div>

                    </div>
                    <div className={styles.cover}>
                        <img src="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-beach-free-image-after-sunset-sky-free-photo.jpeg?w=2210&quality=70" alt="cover" />
                    </div>
                </div>
                <div className={styles.wheelContainer}>
                    <div
                        ref={this.wheelRef}
                        className={styles.outerWheel}
                        onMouseMove={this.handleMouseMove}
                    >
                        <span style={{ position: 'absolute', top: 15, color: 'grey', fontWeight: 'bold', cursor: 'default' }}>Menu</span>
                        <span style={{ position: 'absolute', bottom: 5 }}><WheelIcon
                            src="https://cdn-icons-png.flaticon.com/128/8428/8428588.png"
                            alt="play/pause"
                            iconHeight={30}
                        /></span>
                        <span style={{ position: 'absolute', left: 15 }}><WheelIcon
                            src="https://cdn-icons-png.flaticon.com/128/254/254437.png"
                            alt="previous"
                        /></span>
                        <span style={{ position: 'absolute', right: 15 }}>
                            <WheelIcon
                                src="https://cdn-icons-png.flaticon.com/128/3567/3567831.png"
                                alt="next"
                            />
                        </span>
                        <span className={styles.innerWheel}></span>
                    </div>
                </div>
            </div>
        )
    }
}