import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewBlog from '../components/NewBlog';
import Service from '../services/api';
describe('NewBlog 5.16', () => {

  // 5.16
  it('calls event handler with right details when a new blog is created', async () => {
    const mockHandler = jest.fn();
    const user = { token: '123' };
    const component = render(
      <NewBlog FetchGetblog={mockHandler} user={user} setShowForm={() => {}} />
    );
    jest.spyOn(Service, 'addBlog').mockResolvedValue({});
    const inputTitle = component.container.querySelector('input[name="title"]');
    const inputAuthor = component.container.querySelector('input[name="author"]');
    const inputUrl = component.container.querySelector('input[name="url"]');
    const inputContent = component.container.querySelector('input[name="content"]');
    const form = component.container.querySelector('form');

    fireEvent.change(inputTitle, { target: { value: 'New Blog Title' } });
    fireEvent.change(inputAuthor, { target: { value: 'Author Name' } });
    fireEvent.change(inputUrl, { target: { value: 'https://newblog.com' } });
    fireEvent.change(inputContent, { target: { value: 'Blog content here' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalled();
    });
  });
});
