import facebook from '/home/rinu-elisabath/Desktop/new-react/metro/src/images/facebook.png';


import "./Footer.css"

function Footer() {
    return (

        <div>


            <footer className="footer">
                <div className="copyright">
                    <p>&copy; Copyright KOchi Metro Rail Ltd. | All Rights Reserved.</p>

                </div>

                <div className="social-media-icons">
                    <p>

                        <img src={facebook} className="facebook-logo" />
                       {/*  <img src={instagram} className="instagram-logo" /> */}
                    </p>
                </div>
            </footer >
        </div >
    )
}


export default Footer;