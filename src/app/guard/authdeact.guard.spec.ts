import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { authdeactGuard } from './authdeact.guard';
import { CustomerComponent } from '../common/customer/customer.component';

describe('authdeactGuard', () => {
  const executeGuard: CanDeactivateFn<CustomerComponent> = (
    ...guardParameters
  ) => TestBed.runInInjectionContext(() => authdeactGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    // const component = {} as AppComponent;
    expect(executeGuard).toBeTruthy();
  });
});
