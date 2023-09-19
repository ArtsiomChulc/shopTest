import React, {ChangeEvent, useEffect, useState} from 'react';
import {AppRootStateType, useAppDispatch} from "../../App/store";
import {deleteAdminData, fetchAdminData} from "common/admin/adminReducer";
import {useSelector} from "react-redux";
import {AdminType} from "type/types";
import s from './admin.module.scss'
import {Button, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Admin = () => {
    const [surname, setSurname] = useState<string>('')

    const adminData = useSelector<AppRootStateType, AdminType[]>(state => state.admin)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAdminData(''))
    }, []);

    const brand = adminData.map(br => {
        return br.brands?.map(el => el)
    })

    const priceArr = adminData
        .map(pr => pr.prices?.reduce((a, b) => a + b))

    const deleteDataOnClickHandler = async () => {
        dispatch(deleteAdminData(surname))
        setSurname('')
        // await dispatch(fetchAdminData(''))
    }

    const onChangeSurname = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const valueInput = e.currentTarget.value
        setSurname(valueInput)
    }

    if (adminData.length === 0) return <div style={{
        margin: '100px auto',
        fontSize: '34px',
        fontStyle: 'italic'
    }}>no orders</div>

    return (
        <div className={s.adminContainer}>
            {adminData.map(el => {
                return (
                    <div key={el.id} className={s.adminInfo}>
                        <span>Имя: {el.name}</span>
                        <span>Фамилия: {el.surname}</span>
                        <span>Адрес: {el.address}</span>
                        <span>Телефон: {el.phone}</span>
                    </div>
                )
            })}

            <div className={s.containerPriceBrand}>
                Товары:
                {brand.map(el => {
                    return (
                        <div className={s.brandAdmin}>{el?.map(el => {
                            return (
                                <span>{el}</span>
                            )
                        })}</div>
                    )
                })}
                <div className={s.priceAdmin}>На сумму: {priceArr}</div>
            </div>

            <div className={s.btnContainer}>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon/>}
                    onClick={deleteDataOnClickHandler}
                >
                    Delete data in supabase
                </Button>
                <TextField
                    value={surname}
                    onChange={onChangeSurname}
                    id="outlined-textarea"
                    label="Enter surname"
                    placeholder="Placeholder"
                    multiline
                />
            </div>
        </div>
    );
};

export default Admin;