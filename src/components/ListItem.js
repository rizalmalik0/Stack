import React, { Component } from 'react';
import {
    Text, TouchableWithoutFeedback, View, LayoutAnimation,
    Platform, UIManager
} from 'react-native';
import { connect } from 'react-redux';
import { CardItem } from './common';
import * as actions from '../actions';

class ListItem extends Component {
    constructor() {
        super();

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental
            && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {
        const { library, expanded } = this.props;

        if (expanded) {
            return (
                <CardItem>
                    <Text>{library.description}}</Text>
                </CardItem>
            );
        }
    }

    render() {
        const { id, title } = this.props.library;
        // console.log(this.props);
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.selectLibrary(id)}
            >
                <View>
                    <CardItem>
                        <Text style={styles.textStyles}>{title}</Text>
                    </CardItem>
                    {this.renderDescription()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    textStyles: {
        fontSize: 18,
        paddingLeft: 15
    }
};

const mapStateToProps = (state, ownProps) => {
    const expanded = state.selectedLibraryId === ownProps.library.id;

    return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
