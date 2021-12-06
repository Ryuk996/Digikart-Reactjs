import React, {useContext} from 'react'
import {PublicContext} from '../../PublicContext'

function LoadMore() {
    const state = useContext(PublicContext)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
        <div className="load_more">
            {
                result < page * 9 ? ""
                : <button onClick={() => setPage(page+1)}>Load more</button>
            }
        </div>
    )
}

export default LoadMore