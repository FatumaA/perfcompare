import { useState } from 'react';

import { Button, Input } from '@mui/material';
import { style } from 'typestyle';

import useRawSearchParams from '../../hooks/useRawSearchParams';
import { FontsRaw, Colors } from '../../styles';
import pencilDark from '../../theme/img/pencil-dark.svg';
import pencil from '../../theme/img/pencil.svg';

interface EditButtonProps {
  mode: string;
}

export const ResultsTitle = ({ mode }: EditButtonProps) => {
  const [searchParams, updateSearchParams] = useRawSearchParams();
  const [resultsTitle, setResultsTitle] = useState(
    searchParams.get('title') || 'Results',
  );
  const [isEditing, setIsEditing] = useState(false);

  const styles = {
    title: style({
      ...FontsRaw.HeadingXS,
      fontWeight: 700,
      letterSpacing: '-0.01em',
      margin: 0,
    }),
    editIcon: style({
      marginLeft: '10px',
      cursor: 'pointer',
      color: Colors.LinkText,
    }),
    screenReaderOnly: style({
      position: 'absolute',
      left: '-9999px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }),
  };

  const handleResultsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim();
    setResultsTitle(newTitle);
  };

  const handleEdit = () => setIsEditing(true);

  const handleEditComplete = (
    event: React.FocusEvent | React.KeyboardEvent,
  ) => {
    if (
      (event as React.KeyboardEvent).key === 'Enter' ||
      event.type === 'blur'
    ) {
      const safeTitle = resultsTitle || 'Results';
      setResultsTitle(safeTitle);

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('title', safeTitle);
      updateSearchParams(newSearchParams, {
        method: 'push',
      });

      setIsEditing(false);
    }
  };

  const buttonIcon = (
    <img
      id='edit-button-icon'
      className='icon icon-edit'
      src={mode === 'light' ? pencil.toString() : pencilDark.toString()}
      alt='edit-icon'
    />
  );

  return (
    <div data-testid='results-title-component'>
      {isEditing ? (
        <>
          <label htmlFor='results' className={styles.screenReaderOnly}>
            Results Title
          </label>
          <Input
            id='results'
            type='text'
            name='results-title'
            value={resultsTitle}
            onChange={handleResultsChange}
            onBlur={handleEditComplete}
            onKeyDown={handleEditComplete}
            className={styles.title}
          />
        </>
      ) : (
        <>
          <span className={styles.title}>{resultsTitle}</span>
          <Button
            className='global-edit-button edit-revision-button'
            name='edit-button'
            aria-label='edit revision'
            startIcon={buttonIcon}
            onClick={handleEdit}
            color='primary'
            variant='text'
          />
        </>
      )}
    </div>
  );
};
