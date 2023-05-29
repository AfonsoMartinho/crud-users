import { render, screen, within } from "@testing-library/react";
import { useTheme } from '@mui/material/styles';
import userEvent from "@testing-library/user-event";
import { Filters } from "./index";
describe('Filters', () => {
  it('should render female and male chips', () => {
    render(<Filters onFilter={(filters) => filters}></Filters>);
    const maleChip = screen.getByRole('button', { name: 'Male', exact: false });
    const femaleChip = screen.getByRole('button', { name: /female/i }); 
    
    expect(maleChip).toBeInTheDocument();
    expect(femaleChip).toBeInTheDocument();
  })

  it('should render Nationalities Dropdown with the All value in it', () => {
    render(<Filters onFilter={(filters) => filters}></Filters>);
    const label = screen.getByText(/nationality:/i);
    const dropdown = screen.getByRole('button', {  name: /all/i});
    
    expect(label).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
  })

  it('should render Dropdown Options when clicking on the Nationality dropdwon button', async() => {
    render(<Filters onFilter={(filters) => filters}></Filters>);
    const dropdownButton = screen.getByRole('button', {  name: /all/i});
  
    await userEvent.click(dropdownButton);
    const dropdownOptions = screen.getByTestId('sentinelStart')
  
    expect(dropdownOptions).toBeInTheDocument();
  })

  it('should not render Dropdown Options at the initial render of Filters', async() => {
    render(<Filters onFilter={(filters) => filters}></Filters>);
    const dropdownOptions = screen.queryByTestId('sentinelStart')
  
    expect(dropdownOptions).not.toBeInTheDocument();
  })

  it('should change color to pink when selecting female chips', async () => {
    render(<Filters onFilter={(filters) => filters}></Filters>);
    
    const femaleChip = screen.getByRole('button', {
      name: /female/i
    });
    const femaleChipLabel = screen.getByText(/female/i);
    const femaleChipIcon = within(femaleChip).getByTestId('CancelIcon');

    await userEvent.click(femaleChip);
    
    expect(femaleChipLabel).toHaveStyle(`color: rgb(206 147 216)`);
    expect(femaleChipIcon).toHaveStyle(`color: rgba(156, 39, 176, 0.7)`);
  })

  it('should change color to the blue color when selecting male chips', async () => {
    const blueThemeColor = '#90caf9';
    render(<Filters onFilter={(filters) => filters}></Filters>);
    const maleChip = screen.getByRole('button', {
      name: /male/i
    });
    await userEvent.click(maleChip);

    expect(maleChip).toHaveStyle(`color: ${blueThemeColor}`)
  })

  
    
  

})