import React, { useState } from 'react';

import DeletePopup from '../../components/popups/delete';

import './styles.css';

function ProjectPage() {

    const [showDeleteProjectPopup, setShowDeleteProjectPopup] = useState(false)

    return (
        <section>
            <p>Project list page</p>
            <button onClick={() => {
                setShowDeleteProjectPopup(!showDeleteProjectPopup)
            }}>delete</button>
            {showDeleteProjectPopup &&  <DeletePopup />}
        </section>
    )
}


export default ProjectPage;