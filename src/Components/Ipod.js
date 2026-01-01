import { Component, createRef } from "react";
import styles from "./Ipod.module.css"
import WheelIcon from "./WheelIcon";
import MenuScreen from "./MenuScreen";

const MENUS = {
    mainMenu: ["Cover Flow", "Music", "Game", "Settings"],
    musicMenu: ["All Songs", "Artists", "Albums"]
};

export default class Ipod extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0,
            screenContent: 'mainMenu',
            currentMenu: MENUS.mainMenu
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
        return degrees < 0 ? degrees + 360 : degrees;
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
                this.updateIndex(delta > 0 ? 1 : -1);
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

    handleSelectMenu = (e) => {
        e.stopPropagation();
        const { activeIndex, currentMenu } = this.state;
        const selectedItem = currentMenu[activeIndex];

        if (selectedItem === "Music") {
            this.setState({
                currentMenu: MENUS.musicMenu,
                screenContent: "Music",
                activeIndex: 0
            });
        } else {
            this.setState({
                screenContent: selectedItem
            });
        }
    }

    handleMenuClick = () => {
        const { screenContent } = this.state;
        if (MENUS.musicMenu.includes(screenContent)) {
            this.setState({
                screenContent: "Music",
                currentMenu: MENUS.musicMenu,
                activeIndex: 0
            })
        }
        else {
            this.setState({
                screenContent: "mainMenu",
                currentMenu: MENUS.mainMenu,
                activeIndex: 0
            })
        }
    }

    renderContent = (screenContent, activeIndex) => {
        switch (screenContent) {
            case "mainMenu":
                return (
                    <MenuScreen
                        title="Ipod.js"
                        activeIndex={activeIndex}
                        menuItems={MENUS.mainMenu}
                    />
                );

            case "Music":
                return (
                    <MenuScreen
                        title="Music"
                        activeIndex={activeIndex}
                        menuItems={MENUS.musicMenu}
                    />
                );
            case "Game":
                return (
                    <div className={styles.center}>
                        <img height="75" src="https://cdn-icons-png.flaticon.com/128/686/686589.png" />
                        <h3>Games</h3>
                    </div>
                );

            case "Settings":
                return (
                    <div className={styles.center}>
                        <img height="75" src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png" />
                        <h3>Settings</h3>
                    </div>
                );
            case "Cover Flow":
            case "All Songs":
            case "Artists":
            case "Albums":
                return (
                    <div className={styles.center}>
                        <h3>{screenContent}</h3>
                    </div>
                );

            default:
                return <h3>Something went wrong</h3>;
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
                        <span
                            onClick={this.handleMenuClick}
                            className={styles.menuButton}>
                            Menu
                        </span>
                        <span className={styles.playButton}><WheelIcon
                            src="https://cdn-icons-png.flaticon.com/128/8428/8428588.png"
                            alt="play/pause"
                            iconHeight={30}
                        /></span>
                        <span className={styles.prevButton}><WheelIcon
                            src="https://cdn-icons-png.flaticon.com/128/254/254437.png"
                            alt="previous"
                        /></span>
                        <span className={styles.nextButton}>
                            <WheelIcon
                                src="https://cdn-icons-png.flaticon.com/128/3567/3567831.png"
                                alt="next"
                            />
                        </span>
                        <span
                            onMouseMove={(e) => {
                                e.stopPropagation();
                            }}
                            onClick={this.handleSelectMenu}
                            className={styles.innerWheel}></span>
                    </div>
                </div>
            </div>
        )
    }
}