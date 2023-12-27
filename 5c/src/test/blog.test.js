import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from '../components/Blog';
import Service from '../services/api';

describe('5.13~5.16', () => {
  let component;
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    content: 'Test Content',
    id: 'test-id'
  };

  const user = {
    token: 'test-token'
  };

  const mockHandler = jest.fn();
  jest.spyOn(Service, 'addlikes').mockResolvedValue({});
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} FetchGetblog={mockHandler} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 5.13
  it('renders title and author, but not url or likes by default', () => {
    expect(component.getByText(/Title: Test Blog.*By：Test Author/)).toBeInTheDocument();
    expect(component.queryByText('url: http://testurl.com')).toBeNull();
    expect(component.queryByText('likes:')).toBeNull();
  });

  // 5.14
  it('shows url and likes when showDetail button is clicked', async () => {
    const button = component.getByText('showDetail');
    fireEvent.click(button);
    await waitFor(() => {
      const urlElement = component.container.querySelector(`a[href='${blog.url}']`);
      expect(urlElement).toBeInTheDocument();
      expect(component.getByText('likes:0')).toBeInTheDocument();
    });
  });

  // 5.15
  it('like button is clicked twice, the event handler is called twice', async () => {
    const showDetailButton = component.getByText('showDetail');
    fireEvent.click(showDetailButton);
    await waitFor(() => {
      const likeButton = component.getByText('likes');
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);
      expect(Service.addlikes).toHaveBeenCalledTimes(2);
    });
  });
});
