import classNames from "classnames/bind";
import styles from "./setting.module.scss";
import { UpdateUser } from "../../APIs/user";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useState } from "react";
import React from "react";
import { Button } from '@mantine/core';
const cx = classNames.bind(styles);
function NewActive() {
    const auth = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
    const [updateUser,setUpdateUser] = useState({
        'user':{
            ...auth.user,
            password:'',
            bio: auth.user.bio || ''
        }
    })
    const onchange = (value,type)=>{
        console.log(updateUser)
        setUpdateUser({
            'user':{
                ...updateUser.user,
                [type]:value
            }
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const response = await UpdateUser(updateUser)
            auth.action.login(response.user.token)
        } catch (error) {
            alert('update thất bại')
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cx("wrapper")}>
            <input
                value={updateUser.user.image}
                onChange={(e)=>onchange(e.target.value,'image')}
                style={{ height: '50px', resize: 'vertical' ,cursor:'text'}}
                disabled={loading}
            />
            <input
                onChange={(e)=>onchange(e.target.value,'username')}
                value={updateUser.user.username}
                style={{ height: '50px', resize: 'vertical' }}
                disabled={loading}
            />
            <textarea
                onChange={(e)=>onchange(e.target.value,'bio')}
                value={updateUser.user.bio || ""}
                style={{height:'200px',resize: 'vertical'}}
                placeholder="  Short Bio about you "
                disabled={loading}

            />
            <input
                onChange={(e)=>onchange(e.target.value,'email')}
                value={updateUser.user.email}
                style={{ height: '50px', resize: 'vertical' }}
                disabled={loading}
            />
             <input
                onChange={(e)=>onchange(e.target.value,'password')}
                value={updateUser.user.password}
                style={{ height: '50px', resize: 'vertical' }}
                placeholder="new password"
                disabled={loading}
            />
            <Button className={cx("button")} size="md" type="submit" loading={loading}>
                Update
            </Button>
        </form>
    );
}

export default NewActive;
