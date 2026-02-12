import type { UserRole } from '@cloudrabbit/cloudhop-platform.entities.user';

export type RoleSelectorProps = {
  /**
   * The currently selected roles.
   */
  selectedRoles?: UserRole[];

  /**
   * Callback fired when selection changes.
   */
  onChange?: (roles: UserRole[]) => void;

  /**
   * Whether to restrict selection to a single role.
   * Uses the SelectList component when true.
   */
  singleSelection?: boolean;

  /**
   * Label text displayed above the selector.
   */
  label?: string;

  /**
   * Placeholder text when no roles are selected.
   */
  placeholder?: string;

  /**
   * Disables the interaction.
   */
  disabled?: boolean;

  /**
   * Additional class name for the root container.
   */
  className?: string;
};