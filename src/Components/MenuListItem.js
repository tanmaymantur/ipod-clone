
const MenuListItem = ({ title, active }) => {
    return (
        <div style={{
            ...styles.menuItems,
            background: active ? '#5aabf9f5' : 'white'
        }}>
            <span>{title}</span>
            <img style={{ height: '10px', display: active ? 'block' : 'none' }} src="https://cdn-icons-png.flaticon.com/128/2985/2985179.png" alt="right arrow" />
        </div>
    )
}

const styles = {
    menuItems: {
        padding: '5px',
        marginBottom: '5px',
        // background: '#5aabf9f5',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}

export default MenuListItem;