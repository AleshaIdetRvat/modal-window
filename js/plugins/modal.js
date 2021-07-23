

function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" >
    </div>
    <div class="modal__body" style="width: ${options.width};">
        <div class="modal__header">
            <h1 class="modal__title">${options.title}</h1>
            ${options.closable ? '<div class="modal__btn-close">&times</div>' : ''}
        </div>
        <div class="modal__content">
            ${options.content}
        </div>
        <div class="modal__footer">
            <button class="modal__btn-ok">ok</button>
            <button class="modal__btn-cancel">cancel</button>
        </div>
    </div>
    
    `)

    document.body.querySelector('.wrapper').appendChild(modal)

    return modal
}



$.modal = function (options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false

    const _open = () => {
        !closing && $modal.classList.add('open')
    }
    const _close = () => {
        closing = true
        $modal.classList.remove('open')
        $modal.classList.add('hidden')
        setTimeout(() => {
            $modal.classList.remove('hidden')
        }, ANIMATION_SPEED)
        closing = false
    }

    [
        document.body.getElementsByClassName('modal__overlay')[0],
        document.body.getElementsByClassName('modal__btn-close')[0],
        document.body.getElementsByClassName('modal__btn-ok')[0],
        document.body.getElementsByClassName('modal__btn-cancel')[0],
    ].map(el => el.addEventListener('click', _close))

    return {
        open() {
            _open()
        },
        close() {
            _close()
        },
        destroy() {
            [
                document.body.getElementsByClassName('modal__overlay')[0],
                document.body.getElementsByClassName('modal__btn-close')[0],
                document.body.getElementsByClassName('modal__btn-ok')[0],
                document.body.getElementsByClassName('modal__btn-cancel')[0],
            ].map(el => el.removeEventListener('click', _close))

            document.body.querySelector('.wrapper').removeChild($modal)
        }
    }
}