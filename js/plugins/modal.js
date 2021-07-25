Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function emptyFn() { }

function createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal__footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add(`modal__btn-${btn.type || 'default'}`)
        $btn.onclick = btn.handler || emptyFn

        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '50vh'
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" data-close='true'>
    </div>
    <div class="modal__body" style="width: ${options.width || DEFAULT_WIDTH};">
        <div class="modal__header">
            <h1 class="modal__title">${options.title || 'Window'}</h1>
            ${options.closable ? `<div class="modal__btn-close" data-close='true'>&times</div>` : ''}
        </div>
        <div class="modal__content" data-content>
            ${options.content || ''}
        </div>
    </div>
    
    `)

    const footer = createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))

    document.body.querySelector('.wrapper').appendChild(modal)
    return modal
}



$.modal = function (options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false


    modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hidden')
            setTimeout(() => {
                $modal.classList.remove('hidden')
            }, ANIMATION_SPEED)
            closing = false
        },

    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            if (options.closable) {
                $modal.removeEventListener('click', listener)
            }
            $modal.parentNode.removeChild($modal)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })

    //if (options.closable) {
    //    [
    //        document.body.getElementsByClassName('modal__overlay')[0],
    //        document.body.getElementsByClassName('modal__btn-close')[0],
    //        document.body.getElementsByClassName('modal__btn-ok')[0],
    //        document.body.getElementsByClassName('modal__btn-cancel')[0],
    //    ].map(el => el.addEventListener('click', _close))
    //}

}