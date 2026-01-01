import { Component } from "react";
import MenuListItem from "./MenuListItem";
import styles from "./MenuScreen.module.css"


export default class MenuScreen extends Component {

    render() {
        const { title, menuItems, activeIndex } = this.props;
        return (
            <>
                <div className={styles.list}>
                    <h4>{title}</h4>
                    <div>
                        {menuItems.map((title, i) => <MenuListItem key={i} active={i === activeIndex} title={title} />)}
                    </div>

                </div>
                <div className={styles.cover}>
                    <img src="https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-beach-free-image-after-sunset-sky-free-photo.jpeg?w=2210&quality=70" alt="cover" />
                </div>
            </>
        )
    }
}