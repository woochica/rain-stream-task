import unittest
from mock import patch
from unittest import IsolatedAsyncioTestCase
from app import generate_entries
import app
import datetime

mock_entries = [
    {
        "id": "0c7a88a23e2e133bd56e77b17230d2605ce5f8f7",
        "created_at": datetime.datetime(2008, 10, 31, 0, 30, 30, 130223),
        "url": "https://www.johnson.com/",
        "content": "Increase very Republican three. Consider parent often quality wall example pretty mention.",
        "account": {
            "avatar": "https://dummyimage.com/473x95",
            "displayName": "Justin Mitchell",
        },
    },
    {
        "id": "4a7cf0382afa834fb8fb460d19d771a656d99971",
        "created_at": datetime.datetime(1990, 11, 28, 1, 21, 39, 583368),
        "url": "https://hayes.com/",
        "content": "Include night employee act after more center. Participant subject together perform listen would.",
        "account": {
            "avatar": "https://dummyimage.com/745x810",
            "displayName": "Marvin Parrish",
        },
    },
]


@patch("app.entries", mock_entries)
class Test(IsolatedAsyncioTestCase):
    async def test_generate_entries(self):
        actual_stream = [i async for i in generate_entries(forever=False)]
        expected_stream = [
            '{"id": "0c7a88a23e2e133bd56e77b17230d2605ce5f8f7", "created_at": "2008-10-31T00:30:30.130223", "url": "https://www.johnson.com/", "content": "Increase very Republican three. Consider parent often quality wall example pretty mention.", "account": {"avatar": "https://dummyimage.com/473x95", "displayName": "Justin Mitchell"}}\n',
            '{"id": "4a7cf0382afa834fb8fb460d19d771a656d99971", "created_at": "1990-11-28T01:21:39.583368", "url": "https://hayes.com/", "content": "Include night employee act after more center. Participant subject together perform listen would.", "account": {"avatar": "https://dummyimage.com/745x810", "displayName": "Marvin Parrish"}}\n',
        ]
        self.assertEqual(expected_stream, actual_stream)


if __name__ == "__main__":
    unittest.main()
