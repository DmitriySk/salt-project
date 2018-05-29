import * as React from 'react';
import cn from 'classnames';
import Button, { ButtonType } from '../../components/ui/Button';

const s = require('./About.scss');

class About extends React.Component {
    render() {
        return (
            <div className={s.container}>
                <div className={s.about}>
                    <div className={s.bg_text}>ABOUT ME</div>
                    <h2 className={s.title}>
                        <span>About me</span>
                    </h2>
                    <div className={s.main_block}>
                        <div className={s.left_side}>
                            <div className={s.photo} />
                            <div className={s.contact_info}>
                                <div className={cn(s.icon, s.place)}>Odessa, Ukraine</div>
                                <div className={cn(s.icon, s.mail)}>dima.skalskij@gmail.com</div>
                                <div className={cn(s.icon, s.phone)}>+38 (063) 056-73-32</div>
                                <div className={cn(s.icon, s.skype)}>faust_zed</div>
                            </div>
                        </div>
                        <div className={s.right_side}>
                            <div className={s.about_text}>
                                <p className={s.paragraph}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    Aenean commodo ligula eget dolor. Aenean massa.
                                    Cum sociis natoque penatibus et magnis dis parturient montes,
                                    nascetur ridiculus<br /> mus.
                                </p>
                                <p className={s.paragraph}>
                                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                                    Nulla consequat massa quis enim. Donec pede justo,
                                    fringilla vel, aliquet nec, vulputate eget, arcu.
                                </p>
                                <p className={s.paragraph}>
                                    In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                                    Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                                    Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                                    Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                                </p>
                            </div>
                            <Button
                                text='Download my CV'
                                onClick={() => {}}
                                type={ButtonType.rounded}
                                theme={s}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
