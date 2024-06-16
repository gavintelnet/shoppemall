import React, { useContext } from 'react'
import bg from "../../assets/images/bg-horizontal.jpg";
import logo from "../../assets/images/logo-auth.png";
import { WebsiteConfigContext } from '../../context/ConfigWebsite';
const BaoTri = () => {
    const { logoHeader } = useContext(WebsiteConfigContext);
    // console.log(logoHeader)
    return (
        <div className="login-container" style={{ backgroundImage: `url(${bg})` }}>
            <div className="login-form">
                <img
                    style={{
                        width: 140,
                        margin: "0  auto",
                        display: "flex",
                        marginBottom: 24,
                    }}
                    src={logoHeader}
                    alt=""
                />
                <h2 className="title">Hệ thống đang bảo trì, vui lòng truy cập lại sau...</h2>
            </div>
        </div>
    )
}

export default BaoTri
