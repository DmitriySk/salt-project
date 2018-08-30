import * as React from 'react';
import noop from 'lodash/noop';

interface IProps {
    value: string,
    onChange?: ({ target: object }) => void
}

interface IState {}

class Textarea extends React.Component<IProps, IState> {
    static defaultProps = {
        value: '',
        onChange: noop
    };

    render() {
        const { value, onChange } = this.props;

        return (
            <textarea
                onChange={onChange}
            >{value}</textarea>
        );
    }
}

export default Textarea;