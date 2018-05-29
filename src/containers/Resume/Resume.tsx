import * as React from 'react';
import cn from 'classnames';

const s = require('./Resume.scss');

class Resume extends React.Component {
    render() {
        return (
            <div className={s.container}>
                <div className={s.resume}>
                    <h2 className={s.title}>
                        <span>Resume</span>
                    </h2>
                    <div className={s.stepper}>
                        <h3 className={s.step_title}>Education</h3>
                        <div className={s.steps}>
                            <div className={cn(s.step, s.step_left)}>
                                <div className={s.step_inner}>
                                    <div className={s.step_description}>
                                        <div className={s.step_d_title}>
                                            Odessa National Telecommunications Academy
                                        </div>
                                        <div className={s.step_d_subtitle}>
                                            Engineer of telecommunication
                                        </div>
                                    </div>
                                    <div className={s.step_period}>
                                        2004 - 2009
                                    </div>
                                </div>
                            </div>
                            <div className={cn(s.step, s.step_right)}>
                                <div className={s.step_inner}>
                                    <div className={s.step_description}>
                                        <div className={s.step_d_title}>
                                            IT Step Academy
                                        </div>
                                        <div className={s.step_d_subtitle}>
                                            Android Developer
                                        </div>
                                    </div>
                                    <div className={s.step_period}>
                                        2015 - 2016
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.stepper}>
                        <h3 className={s.step_title}>Experience</h3>
                        <div className={s.steps}>
                            <div className={cn(s.step, s.step_left)}>
                                <div className={s.step_inner}>
                                    <div className={s.step_description}>
                                        <div className={s.step_d_title}>
                                            Polaz LLC
                                        </div>
                                        <div className={s.step_d_subtitle}>
                                            JavaScript Developer
                                        </div>
                                    </div>
                                    <div className={s.step_period}>
                                        2013 - 2014
                                    </div>
                                </div>
                            </div>
                            <div className={cn(s.step, s.step_right)}>
                                <div className={s.step_inner}>
                                    <div className={s.step_description}>
                                        <div className={s.step_d_title}>
                                            Sterium
                                        </div>
                                        <div className={s.step_d_subtitle}>
                                            Front-End Developer,
                                            Android Developer
                                        </div>
                                    </div>
                                    <div className={s.step_period}>
                                        2014 - 2016
                                    </div>
                                </div>
                            </div>
                            <div className={cn(s.step, s.step_left)}>
                                <div className={s.step_inner}>
                                    <div className={s.step_description}>
                                        <div className={s.step_d_title}>
                                            Andersen
                                        </div>
                                        <div className={s.step_d_subtitle}>
                                            JavaScript Developer
                                        </div>
                                    </div>
                                    <div className={s.step_period}>
                                        2016 - 2017
                                    </div>
                                </div>
                            </div>
                            <div className={cn(s.step, s.step_right, s.step_current)}>
                                <div className={s.step_inner}>
                                    <div className={s.step_description}>
                                        <div className={s.step_d_title}>
                                            Lohika
                                        </div>
                                        <div className={s.step_d_subtitle}>
                                            JavaScript Engineer
                                        </div>
                                    </div>
                                    <div className={s.step_period}>
                                        2017 - now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Resume;
