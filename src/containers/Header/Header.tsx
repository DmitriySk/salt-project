import * as React from "react";
import GitHub from '../../components/ui/Icon/Icons/GitHub';
import CV from '../../components/ui/Icon/Icons/CV';
import LI from '../../components/ui/Icon/Icons/LI';
import Arrow from '../../components/ui/Icon/Icons/Arrow';

const s = require("./Header.scss");

const name_svg = require('./name.svg');

interface IProps {}

interface IState {}

class Header extends React.Component<IProps, IState> {
    render() {
        return <div className={s['m-header']}>
            <div className={s['m-header-topmenu']}>
                <span className={s['m-header-link']}>About me</span>
                <span className={s['m-header-link']}>Resume</span>
                <span className={s['m-header-link']}>Skills</span>
                <span className={s['m-header-link']}>Get in touch</span>
            </div>
            <div className={s['m-header-inner']}>
                <div className={s['m-header-inner-name']}>
                    <img className={s['m-header-name-img']} src={name_svg} />
                </div>
                <div className={s['m-header-soc-arrow']}>
                    <div className={s['m-header-inner-icons']}>
                        <GitHub className={s.soc_icon} width={60} height={60}/>
                        <CV className={s.soc_icon} width={60} height={60}/>
                        <LI className={s.soc_icon} width={60} height={60}/>
                    </div>
                    <Arrow className={s['icon-arrow']} />
                </div>
            </div>
        </div>;
    }
}

export default Header;
