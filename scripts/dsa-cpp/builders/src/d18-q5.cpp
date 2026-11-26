#include <bits/stdc++.h>
using namespace std;

int best_cookie(const std::vector<int>& cookies, int greed) {
    int best = -1;
    for (int c : cookies)
        if (c <= greed && c > best) best = c;
    return best;
}

int main() {
    int m;
    if (!(cin >> m)) return 0;
    vector<int> cookies(m);
    for (int& x : cookies) cin >> x;
    int greed;
    cin >> greed;
    cout << best_cookie(cookies, greed) << "\n";
    return 0;
}
