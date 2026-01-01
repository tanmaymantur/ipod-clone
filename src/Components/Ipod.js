import { Component, createRef } from "react";
import styles from "./Ipod.module.css"
import WheelIcon from "./WheelIcon";
import MenuScreen from "./MenuScreen";

const mainMenu = [
    "Cover Flow",
    "Music",
    "Game",
    "Settings"
]

const musicMenu = [
    'All Songs',
    'Artists',
    'Albums'
]

export default class Ipod extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
            screenContent: 'mainMenu',
            currentMenu: mainMenu
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
        const { activeIndex, currentMenu } = this.state;
        let newIndex;

        if (direction === 1) {
            newIndex = (activeIndex + 1) % currentMenu.length;
        }
        else {
            newIndex = (activeIndex - 1 + currentMenu.length) % currentMenu.length
        }
        this.setState({
            activeIndex: newIndex
        })
    }

    handleSelectMenu = (activeIndex) => {
        const { currentMenu } = this.state;
        if (activeIndex === 'mainMenu') {
            this.setState({
                screenContent: "mainMenu"
            })
        }
        if (activeIndex === 0) {
            this.setState({
                screenContent: currentMenu[activeIndex]
            })
        }
        if (activeIndex === 1) {
            this.setState({
                currentMenu: musicMenu,
                screenContent: currentMenu[activeIndex]
            })
        }
        if (activeIndex === 2) {
            this.setState({
                screenContent: currentMenu[activeIndex]
            })
        }
        if (activeIndex === 3) {
            this.setState({
                screenContent: currentMenu[activeIndex]
            })
        }
    }

    handleMenuClick = () => {
        const { screenContent } = this.state;
        if (musicMenu.includes(screenContent)) {
            this.setState({
                screenContent: "Music"
            })
        }
        else {
            this.setState({
                screenContent: "mainMenu",
                currentMenu: mainMenu
            })
        }
    }

    renderContent = (screenContent, activeIndex) => {
        switch (screenContent) {
            case "mainMenu":
                return <MenuScreen title="Ipod.js" activeIndex={activeIndex} menuItems={mainMenu} />;
            case "Cover Flow":
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3>Cover Flow</h3>
                    </div>
                );
            case "Game":
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img height='75' src="https://cdn-icons-png.flaticon.com/128/686/686589.png" alt="games" />
                        <h3>Games</h3>
                    </div>
                );
            case "Settings":
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img height='75' src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png" alt="setting" />
                        <h3>Settings</h3>
                    </div>
                );
            case "Music":
                return <MenuScreen title="Music" activeIndex={activeIndex} menuItems={musicMenu} />;
            case 'All Songs':
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3>All songs List</h3>
                    </div>
                );
            case 'Artists':
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3>All Artists</h3>
                    </div>
                );
            case 'Albums':
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h3>All Albums</h3>
                    </div>
                );
            default:
                return <h1>Something Went Wrong</h1>
        }
    }

    render() {
        const { activeIndex, screenContent } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.screen}>
                    {this.renderContent(screenContent, activeIndex)}
                </div>
                <div className={styles.wheelContainer}>
                    <div
                        ref={this.wheelRef}
                        className={styles.outerWheel}
                        onMouseMove={this.handleMouseMove}
                    >
                        <span onClick={this.handleMenuClick} style={{ position: 'absolute', top: 15, color: 'grey', fontWeight: 'bold', cursor: 'default' }}>Menu</span>
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
                        <span onClick={() => this.handleSelectMenu(activeIndex)} className={styles.innerWheel}></span>
                    </div>
                </div>
            </div>
        )
    }
}