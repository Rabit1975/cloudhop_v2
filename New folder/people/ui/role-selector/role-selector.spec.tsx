import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { UserRole } from '@cloudrabbit/cloudhop-platform.entities.user';
import { RoleSelector } from './role-selector.js';
import styles from './role-selector.module.scss';

describe('RoleSelector', () => {
  it('should render in multi-select mode and allow selecting roles', async () => {
    const onChange = vi.fn();
    render(
      <MockProvider>
        <RoleSelector label="Assign roles" selectedRoles={[UserRole.User]} onChange={onChange} />
      </MockProvider>
    );

    // Ensure the trigger is visible and click it to open the dropdown
    // Use getByRole for the button, using the accessible name which is derived from the label and selected values
    const trigger = screen.getByRole('button', { name: /Assign roles: User/i });
    fireEvent.click(trigger);

    // Wait for dropdown options to appear
    await waitFor(() => expect(screen.getByText('Admin')).toBeVisible());

    // Click on 'Admin' option
    const adminOption = screen.getByText('Admin');
    fireEvent.click(adminOption);

    // Expect onChange to be called with updated roles
    expect(onChange).toHaveBeenCalledWith([UserRole.User, UserRole.Admin]);

    // Click on 'Moderator' option
    const moderatorOption = screen.getByText('Moderator');
    fireEvent.click(moderatorOption);

    // Expect onChange to be called with updated roles
    expect(onChange).toHaveBeenCalledWith([UserRole.User, UserRole.Admin, UserRole.Moderator]);

    // Re-click 'User' to deselect
    const userOption = screen.getByText('User');
    fireEvent.click(userOption);
    expect(onChange).toHaveBeenCalledWith([UserRole.Admin, UserRole.Moderator]);
  });

  it('should render in single-select mode and allow selecting a role', async () => {
    const onChange = vi.fn();
    render(
      <MockProvider>
        <RoleSelector singleSelection label="Select primary role" selectedRoles={[UserRole.User]} onChange={onChange} />
      </MockProvider>
    );

    // SelectList's trigger has role="button", and its accessible name is the displayed selected value
    const selectTrigger = screen.getByRole('button', { name: /User/i });
    fireEvent.click(selectTrigger); // Open the SelectList dropdown

    // Wait for dropdown options to appear (e.g., 'Admin')
    await waitFor(() => expect(screen.getByText('Admin')).toBeVisible());

    const adminOption = screen.getByText('Admin');
    fireEvent.click(adminOption); // Select 'Admin'

    expect(onChange).toHaveBeenCalledWith([UserRole.Admin]);
    // The dropdown should close after selection in single-select
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
  });

  it('should display the selected roles in multi-select mode', async () => {
    const onChange = vi.fn();
    render(
      <MockProvider>
        <RoleSelector label="Assign roles" selectedRoles={[UserRole.User, UserRole.Admin]} onChange={onChange} />
      </MockProvider>
    );

    // Get the dropdown trigger by its accessible name
    const trigger = screen.getByRole('button', { name: /Assign roles: Admin, User/i });
    
    // The text content should be displayed within the placeholder inside Dropdown's trigger.
    expect(trigger).toHaveTextContent('Admin, User'); // Sorted alphabetically as per component logic
  });

  it('should display placeholder text when no roles are selected in multi-select', () => {
    const onChange = vi.fn();
    render(
      <MockProvider>
        <RoleSelector selectedRoles={[]} onChange={onChange} placeholder="Select roles..." />
      </MockProvider>
    );

    // Get the dropdown trigger by its placeholder text as accessible name
    const trigger = screen.getByRole('button', { name: /Select roles.../i }); 
    expect(trigger).toHaveTextContent('Select roles...');
  });

  it('should be disabled when disabled prop is true', async () => {
    const onChange = vi.fn();
    render(
      <MockProvider>
        <RoleSelector disabled label="Disabled Selector" selectedRoles={[UserRole.User]} onChange={onChange} />
      </MockProvider>
    );

    // Disabled multi-select
    const disabledMultiTrigger = screen.getByRole('button', { name: /Disabled Selector: User/i });
    expect(disabledMultiTrigger).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(disabledMultiTrigger); // Attempt to click

    // Dropdown should not open, onChange should not be called
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();

    // Test disabled single-select
    render(
      <MockProvider>
        <RoleSelector disabled singleSelection label="Disabled Single" selectedRoles={[UserRole.User]} onChange={onChange} />
      </MockProvider>
    );
    // SelectList's trigger has role="button", and its accessible name is the displayed selected value
    const disabledSingleTrigger = screen.getByRole('button', { name: /User/i });
    expect(disabledSingleTrigger).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(disabledSingleTrigger); // Attempt to click
    // The options should not appear for a disabled SelectList
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});