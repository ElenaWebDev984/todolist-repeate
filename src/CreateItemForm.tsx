import {ChangeEvent, type KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type CreateItemFormType = {
    onCreateItem: (title: string) => void,
}


export const CreateItemForm = ({onCreateItem}: CreateItemFormType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const createItemOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createItemHandler()
        }
    }


    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={changeItemTitleHandler}
                   onKeyDown={createItemOnKeyDownHandler}
            />
            <Button title={'+'}
                    onClick={createItemHandler}
            />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
