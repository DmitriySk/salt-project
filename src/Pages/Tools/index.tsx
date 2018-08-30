import * as React from "react";
import Textarea from '../../components/ui/Textarea';

interface IState {
    value: string
}

class Tools extends React.Component<void, IState> {
    state = {
        value: ''
    };

    handleChangeText = ({ target: { value } }) => {
        this.setState({
            value
        });
    };

    render() {
        const { value } = this.state;

        return (
          <div>
              <Textarea
                  value={value}
                  onChange={this.handleChangeText}
              />
          </div>
        );
    }

}

export default Tools;