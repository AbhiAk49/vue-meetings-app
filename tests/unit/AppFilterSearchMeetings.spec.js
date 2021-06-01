import { shallowMount } from '@vue/test-utils'
import AppFilterSearchMeetings from '@/components/AppFilterSearchMeeting.vue'

describe('AppFilterSearchMeetings.vue', () => {
  it('renders FilterSearch page', () => {
    const wrapper = 
    shallowMount(AppFilterSearchMeetings,{ mocks: 
                    { 
                      $store: 
                        {state:
                            {auth:
                                { token:'token' , email:'email' }
                            } 
                          } 
                        }
                    }
                );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('#input-1').exists()).toBe(true);
    expect(wrapper.find('#input-2').attributes('placeholder')).toBe('Search using words that describe your meeting');
  })
})
