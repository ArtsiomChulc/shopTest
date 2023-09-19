import React, {useState} from 'react';
import s from './header.module.scss'
import {
    AppBar,
    Avatar,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    SwipeableDrawer,
    Toolbar,
    useMediaQuery
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {CardType} from "type/types";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {ChevronRight} from "@mui/icons-material";
import {useAuth} from "hook/useAuth";
import {AppRootStateType, useAppDispatch} from "App/store";
import {removeUser} from "App/user-reducer";
import {appActions} from "App/appReducer";
import {useSelector} from "react-redux";

type HeaderPropsType = {
    cart: CardType[]
    totalCost?: number
}

const useStyles = makeStyles(() => ({
    avatar: {
        marginRight: 'auto',
        color: 'white',
        backgroundColor: 'black !important',
        borderRadius: '0 !important',
        height: 30,
        border: '2px solid white',
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent'
    },
    linkHor: {
        color: "white",
        textDecoration: 'none',
        fontSize: 'calc(12px + 10 * (100vw / 1440))'
    },
    linkVerWrap: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkVer: {
        color: "black",
        textDecoration: 'none',
        fontSize: '22px',
        padding: '10px 30px'
    },
    linkBox: {
        display: 'flex',
        gap: '15px',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    burgerBox: {
        marginRight: '5%',
    },
    cartLength: {
        marginRight: '10px',
        fontSize: 'calc(12px + 10 * (100vw / 1440))'
    },
    info: {
        marginLeft: '10px',
        fontSize: 'calc(12px + 10 * (100vw / 1440))'
    }
}))

const Header = (props: HeaderPropsType) => {
    const [open, setOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const styles = useStyles()

    const hiddenLink = useMediaQuery<any>('(max-width: 800px)')
    const hiddenIcon = useMediaQuery<any>('(min-width: 800.1px)')

    const {isAuth} = useAuth();

    const user = useSelector<AppRootStateType, any>(state => state.user.email)

    const removeUserAndChangeStatus = () => {
        dispatch(removeUser())
        dispatch(appActions.setAppStatus({status: 'idle'}))
        localStorage.removeItem('authData');
    }

    return (
        <AppBar position={'sticky'} color={'primary'}>
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters>
                    <Avatar className={styles.avatar}>A</Avatar>

                    {hiddenLink ? null : <div className={styles.linkBox}>
                        <Link className={styles.linkHor} to={'/'}>Главная</Link>
                        <Link className={styles.linkHor} to={'/product'}>Товары</Link>
                        <Link className={styles.linkHor} to={'/checkout'}>Оформить заказ</Link>
                        <Link className={styles.linkHor} to={'/about'}>О нас</Link>
                        <Link className={styles.linkHor} to={'/admin'}><SettingsIcon/></Link>
                        {!isAuth ?
                            <Link className={styles.linkHor} to={'/login'}>LogIn</Link>
                            : <span
                                onClick={removeUserAndChangeStatus}
                                style={{cursor: 'pointer', display: 'flex', flexDirection: 'column'}}
                            ><span>{user} </span>Log Out</span>}

                    </div>}
                    {hiddenIcon ? null : <div className={styles.burgerBox}>
                        <IconButton color={'inherit'} size={'large'}>
                            <MenuIcon onClick={() => setOpen(true)}/>
                        </IconButton>
                    </div>}
                    <div className={s.cartWrap}>
                        <span className={`${styles.cartLength} ${s.cartLength}`}><span>{props.cart.length}</span></span>
                        <Link to={'/shoppingCart'}>
                            <IconButton color="default" aria-label="add to shopping cart" >
                                <AddShoppingCartIcon/>
                            </IconButton>
                        </Link>
                    </div>
                    <span className={styles.info}>Total: <span>{props.totalCost ? props.totalCost : 0} $</span></span>
                </Toolbar>
            </Container>
            <div>
                <SwipeableDrawer
                    onOpen={() => {
                        setOpen(true)
                    }}
                    onClose={() => {
                        setOpen(false)
                    }}
                    open={open}
                    anchor={'right'}
                >
                    <div>
                        <IconButton>
                            <ChevronRight onClick={() => setOpen(false)}/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List className={styles.linkVerWrap}>
                        <ListItem>
                            <Link className={styles.linkVer} to={'/'}>Главная</Link>
                        </ListItem>
                        <ListItem>
                            <Link className={styles.linkVer} to={'/product'}>Товары</Link>
                        </ListItem>
                        <ListItem>
                            <Link className={styles.linkVer} to={'/checkout'}>Оформить заказ</Link>
                        </ListItem>
                        <ListItem>
                            <Link className={styles.linkVer} to={'/about'}>О нас</Link>
                        </ListItem>
                        <ListItem>
                            <Link className={styles.linkVer} to={'/admin'}><SettingsIcon/></Link>
                        </ListItem>
                        {!isAuth ?
                            <Link className={styles.linkVer} to={'/login'}>LogIn</Link>
                            : <span
                                onClick={removeUserAndChangeStatus}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    padding: '20px',
                                    background: 'blanchedalmond',
                                    width: '100%',
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    flexDirection: 'column'
                                    // color: 'white'
                                }}
                            ><span>{user}</span>LogOut</span>}
                    </List>
                </SwipeableDrawer>
            </div>
        </AppBar>
    );
};

export default Header;