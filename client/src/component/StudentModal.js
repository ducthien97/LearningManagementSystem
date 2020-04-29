import React, {Component} from 'react'
import {
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap';
import {connect} from 'react-redux'
import {addStudent} from '../actions/studentActions'
import PropTypes from 'prop-types'

class SudentModal extends Component{
    state = {
        modal: false,
        name: ""
    }
}