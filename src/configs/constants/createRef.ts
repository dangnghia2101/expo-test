import { createRef, MutableRefObject } from 'react';

import { GlobalAlertRef } from '@/components/global/GlobalAlert';
import { ViewerRef } from '@/components/global/GlobalImageViewer';
import { GlobalLoadingRef } from '@/components/global/GlobalLoading';

export const appLoading = createRef<GlobalLoadingRef>();

export const appImageViewer = createRef<ViewerRef>();

export const appAlert = createRef<GlobalAlertRef>();

export const currentChatId: MutableRefObject<string | null> = { current: null };
