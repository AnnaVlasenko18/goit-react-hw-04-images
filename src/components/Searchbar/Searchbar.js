import css from './Searchbar.module.css';
import { Formik, Form, Field } from 'formik';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        query: '',
      }}
      onSubmit={(values, actions) => {
        onSubmit(values);
        actions.resetForm();
      }}
    >
      <Form className={css.Searchbar}>
        <div className={css.SearchForm}>
          <Field
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            name="query"
            placeholder="Search images and photos"
          />
          <BsSearch size={25} />
          <button className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>
              <BsSearch size={20} />
            </span>
          </button>
        </div>
      </Form>
    </Formik>
  );
};
