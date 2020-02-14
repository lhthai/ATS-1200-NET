import React from 'react'
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function Message(props) {
    const { content, type, show } = props;

    return (
        <div>
            {type === 'error' ? (
                <Alert color='danger' isOpen={show}>
                    <FontAwesomeIcon icon={faExclamationCircle} />{' '}{content}
                </Alert>
            ) : (
                    <Alert color="success" isOpen={show}>
                        <FontAwesomeIcon icon={faCheckCircle} />{' '}{content}
                    </Alert>
                )}
        </div>
    )
}

export default Message
