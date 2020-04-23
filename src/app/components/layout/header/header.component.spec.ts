import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display header', () => {
    expect(
      fixture.nativeElement.querySelector('.appHeader').textContent
    ).toContain('Users');
    expect(
      fixture.nativeElement.querySelector('.appHeader a').textContent
    ).toContain('Home');
    expect(
      fixture.nativeElement.querySelector('.appHeader a:nth-of-type(2)')
        .textContent
    ).toContain('Register');
    expect(
      fixture.nativeElement.querySelector('.appHeader a:nth-of-type(3)')
        .textContent
    ).toContain('List');
  });
});
