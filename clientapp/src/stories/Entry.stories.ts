import type { Meta, StoryObj } from '@storybook/react';

import { Entry } from '../components/Entry';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Entry',
  component: Entry,
  parameters: {
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Entry>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    createdAt: '2024-01-19T21:54:11+00:00',
    url: 'https://tambayan.us/@ouij/111784837185512928',
    content: `<p>I keep going back to Ubuntu.</p><p>Honestly, I don't care if this makes me basic as a desktop <a href="https://tambayan.us/tags/linux" class="mention hashtag" rel="nofollow noopener noreferrer" target="_blank">#<span>linux</span></a> user. <a href="https://tambayan.us/tags/Ubuntu" class="mention hashtag" rel="nofollow noopener noreferrer" target="_blank">#<span>Ubuntu</span></a> has always been there for me, and it's done what I've needed it for me to do, and  I am comfortable with it. I guess I'll never be one of the cool kids though lol</p>`,
    avatar: 'https://sb-r5tyu2sv9b.b-cdn.net/accounts/avatars/109/813/278/567/714/250/original/4fd32bb660c69c98.jpg',
    displayName: 'Luigi de Guzman',
  },
};
