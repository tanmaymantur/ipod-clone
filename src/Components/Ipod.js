import { Component, createRef } from "react";
import styles from "./Ipod.module.css"
import WheelIcon from "./WheelIcon";
import MenuScreen from "./MenuScreen";

// Constant menus list to show on screen 
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


    /**
     * Calculates the angle in degrees from the center of the wheel to a given point.
     * @param {number} clientX - The X coordinate of the point in the viewport
     * @param {number} clientY - The Y coordinate of the point in the viewport
     * @returns {number} The angle in degrees (0-360), where 0° is to the right and increases counter-clockwise
     */
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


    /**
     * Handles mouse movement on the iPod wheel to detect rotation.
     * Only responds to left mouse button (button 1) being pressed.
     * Calculates the angle change between the current and previous mouse position,
     * normalizes it to the range -180 to 180 degrees, and updates the index
     * if the angle change exceeds the sensitivity threshold.
     *
     * @param {MouseEvent} e - The mouse event object containing clientX, clientY, and buttons properties
     * @returns {void}
     */
    handleMouseMove = (e) => {
        // return if any mouse button other than left is pressed
        if (e.buttons !== 1) return;
        // get the current angle based on mouse position
        const currentAngle = this.getAngle(e.clientX, e.clientY);
        if (this.lastAngle !== null) {
            let delta = currentAngle - this.lastAngle;

            // normalize delta to the range -180 to 180
            if (delta > 180) delta -= 360;
            if (delta < -180) delta += 360;

            // update index if the angle change exceeds sensitivity
            if (Math.abs(delta) >= this.sensitivity) {
                this.updateIndex(delta > 0 ? 1 : -1);
                this.lastAngle = currentAngle;
            }
        }
        else {
            // initialize lastAngle on the first move
            this.lastAngle = currentAngle;
        }
    }

    /**
     * Updates the active index based on the direction provided.
     * 
     * @param {number} direction - The direction to update the index. 
     *                             Use 1 to move to the next item and 
     *                             any other value to move to the previous item.
     * 
     * @returns {void} 
     */
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


    /**
     * Handles the main button click event.
     * 
     * This function stops the event from propagating and updates the component's state
     * based on the currently selected item in the menu. If the selected item is "Music",
     * it switches to the music menu and resets the active index. Otherwise, it updates
     * the screen content to the selected item.
     * 
     * @param {Event} e - The click event triggered by the main button.
     * @returns {void}
     */
    handleMainButtonClick = (e) => {
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


    /**
     * Handles the click event for the menu.
     * Updates the state based on the current screen content.
     * If the current screen content is part of the music menu,
     * it sets the screen content to "Music" and updates the current menu
     * and active index accordingly. Otherwise, it resets to the main menu.
     *
     * @function handleMenuClick
     * @returns {void}
     */
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

    /**
     * Renders the content based on the provided screen content and active index.
     *
     * @param {string} screenContent - The current screen to render. Possible values include "mainMenu", "Music", "Game", "Settings", "Cover Flow", "All Songs", "Artists", and "Albums".
     * @param {number} activeIndex - The index of the currently active menu item.
     * @returns {JSX.Element} The rendered component for the specified screen content.
     */
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
                        <img height="75" src="https://cdn-icons-png.flaticon.com/128/686/686589.png" alt="games" />
                        <h3>Games</h3>
                    </div>
                );

            case "Settings":
                return (
                    <div className={styles.center}>
                        <img height="75" src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png" alt="settings" />
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
                            onClick={this.handleMainButtonClick}
                            className={styles.innerWheel}></span>
                    </div>
                </div>
            </div>
        )
    }
}