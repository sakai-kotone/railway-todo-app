import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BackButton } from '~/components/BackButton';
import AppButton from '~/components/AppButton';
import './index.css';
import { createList, setCurrentList } from '~/store/list/index';
import { useId } from '~/hooks/useId';

const NewList = () => {
  const id = useId();
  const history = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsSubmitting(true);

      void dispatch(createList({ title }))
        .unwrap()
        .then((listId) => {
          dispatch(setCurrentList(listId));
          history.push(`/`);
        })
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [title],
  );

  return (
    <main className="new_list">
      <BackButton />
      <h2 className="new_list__title">New List</h2>
      <p className="new_list__error">{errorMessage}</p>
      <form className="new_list__form" onSubmit={onSubmit}>
        <fieldset className="new_list__form_field">
          <label htmlFor={`${id}-title`} className="new_list__form_label">
            Name
          </label>
          <input
            id={`${id}-title`}
            className="app_input"
            placeholder="Family"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </fieldset>
        <div className="new_list__form_actions">
          <AppButton label="Cancel" to="/" isLink variant="secondary" />
          <div className="new_list__form_actions_spacer"></div>
          <AppButton label="Create" type="submit" disabled={isSubmitting} />
        </div>
      </form>
    </main>
  );
};

export default NewList;