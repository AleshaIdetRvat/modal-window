const options = {
    title: "Some Title",
    content:
        `<p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet.</p>`,
    closable: true,
    width: '300px',
    footerButtons: [
        {
            text: 'Ok', type: 'ok', handler() {
                console.log('Ok btn clicked');
            }
        },
        {
            text: 'Cancel', type: 'cancel', handler() {
                console.log('Cancel btn clicked');
            }
        }
    ],
}

const testModal = $.modal(options)
